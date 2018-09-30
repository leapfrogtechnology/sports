import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import FixtureTeam from './partials/FixtureTeam';
import FixtureDate from './partials/FixtureDate';
import FixtureInfo from './partials/FixtureInfo';
import FixtureResult from './partials/FixtureResult';

class ScoreCard extends Component {
  parseFixtureDate = fixtureDate => {
    let fDate = new Date(fixtureDate);
    let weekDay = dateFns.format(fDate, 'dddd');

    if (dateFns.isToday(fDate)) {
      weekDay = 'Today';
    } else if (dateFns.isTomorrow(fDate)) {
      weekDay = 'Tomorrow';
    } else if (dateFns.isYesterday(fDate)) {
      weekDay = 'Yesterday';
    }

    let minutes = dateFns.format(fDate, 'mm');
    let hours = dateFns.format(fDate, 'HH');
    let hour = hours > 12 ? `${hours - 12}` : `${hours}`;
    let amPm = hours >= 12 ? `PM` : `AM`;

    return {
      weekDay: weekDay,
      date: dateFns.format(fDate, 'D MMMM'),
      time: `${hour}:${minutes} ${amPm}`
    };
  };

  render() {
    let fixture = this.props.fixture;
    let fixtureInfo = fixture.round
      ? [fixture.categoryType, fixture.round]
      : ['HALF-TIME', `${fixture.homeTeamHalfTimeScore} - ${fixture.homeTeamHalfTimeScore}`];
    let fixtureDate = this.parseFixtureDate(fixture.date);

    return (
      <div className="score-card-wrapper">
        <Link
          key={fixture.id}
          to={{
            pathname: `/carrom-board/fixture/${fixture.id}`,
            state: {
              modal: true,
              data: fixture
            }
          }}
        >
          <div className="score-card">
            <div className="score-brief">
              <FixtureDate fixtureDate={fixtureDate} />
              <FixtureTeam team={fixture.homeTeam} classNames="home-team text-right" />
              <FixtureResult fixture={fixture} />
              <FixtureTeam team={fixture.awayTeam} classNames="away-team text-left" />
              <FixtureInfo fixtureInfo={fixtureInfo} />
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

ScoreCard.propTypes = {
  fixture: PropTypes.object,
  toggleModal: PropTypes.func,
  updateShowModalData: PropTypes.func
};

export default ScoreCard;
