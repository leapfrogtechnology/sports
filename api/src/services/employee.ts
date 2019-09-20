import axios from 'axios';
import { ApolloError } from 'apollo-server-core';

import knex from '../config/knex';
import TABLES from '../constants/tables';
import Employee from '../models/Employee';
import appConfig from '../config/appConfig';
import EmployeeInterface, { EMSEmployee, DBEmployeePayload } from '../domains/employee';

/**
 * Sync the employees list.
 * Fetch list from EMS.
 * Add if they do not exist, update if they exist.
 *
 * @export
 * @returns {Promise<object>}
 */
export async function syncEmployees(): Promise<object> {
  try {
    // Fetch employees list from EMS
    const emsEmployees = await fetchEmployeesFromEMS();

    // Fetch employees from the database
    const existingEmployees = await fetchEmployeesFromDB();
    const existingEmployeeEmsIds = existingEmployees.map(e => e.emsEmployeeId);

    // Filter the new employees
    const newEmployees = emsEmployees.filter(e => !existingEmployeeEmsIds.includes(e.id));

    // Insert
    await addNewEmployees(newEmployees);

    // Filter the existing employees
    const toBeUpdatedEmployees = emsEmployees.filter(e => existingEmployeeEmsIds.includes(e.id));

    // Update
    await updateExistingEmployees(toBeUpdatedEmployees, existingEmployees);

    return {
      count: {
        new: newEmployees.length,
        updated: toBeUpdatedEmployees.length
      }
    };
  } catch (err) {
    throw new ApolloError('Unable to sync employees');
  }
}

/**
 * Fetch list of employees from EMS.
 *
 * @returns {Promise<EMSEmployee[]>}
 */
async function fetchEmployeesFromEMS(): Promise<EMSEmployee[]> {
  const response = await axios({
    method: 'GET',
    url: appConfig.ems.apiURL,
    timeout: 1800000, // 30 minutes
    headers: {
      Authorization: `APIKEY ${appConfig.ems.apiKey}`
    },
    params: {
      size: 1000
    }
  });

  return (response.data && response.data.data) || [];
}

/**
 * Fetch list of ems employee IDs from the database.
 *
 * @returns {Promise<Employee[]>}
 */
async function fetchEmployeesFromDB(): Promise<EmployeeInterface[]> {
  const result = await new Employee().fetchAll();

  return result.serialize();
}

/**
 * Get mapped employees list from EMS.
 *
 * @param {EMSEmployee[]} emsEmployees
 * @returns {DBEmployeePayload[]}
 */
function getMappedEmployeesListFromEMS(emsEmployees: EMSEmployee[]): DBEmployeePayload[] {
  return emsEmployees.reduce(
    (acc: any, emp: EMSEmployee) => [
      ...acc,
      {
        email: emp.email,
        status: emp.empStatus,
        emsEmployeeId: emp.empId,
        firstName: emp.firstName,
        middleName: emp.middleName,
        lastName: emp.lastName,
        profilePictureUrl: emp.avatarUrl,
        updatedAt: new Date().toISOString()
      }
    ],
    []
  );
}

/**
 * Insert new employees' records from EMS.
 *
 * @param {EMSEmployee[]} employees
 */
async function addNewEmployees(employees: EMSEmployee[]) {
  const mappedNewEmployees = getMappedEmployeesListFromEMS(employees);

  // Insert new employees info
  const chunkSize = 10;
  await knex.batchInsert(TABLES.EMPLOYEES, mappedNewEmployees, chunkSize);
}

/**
 * Update the existing employees with respect to the EMS data.
 *
 * @param {EMSEmployee[]} employees
 * @param {EmployeeInterface[]} existingEmployees
 */
async function updateExistingEmployees(employees: EMSEmployee[], existingEmployees: EmployeeInterface[]) {
  const mapToBeUpdatedEmployees = getMappedEmployeesListFromEMS(employees);

  mapToBeUpdatedEmployees.forEach(async e => {
    const emp = existingEmployees.find(em => em.emsEmployeeId === e.emsEmployeeId);

    if (emp) {
      const empModel = await new Employee({ id: emp.id }).fetch();

      await empModel.save(e, { patch: true });
    }
  });
}
