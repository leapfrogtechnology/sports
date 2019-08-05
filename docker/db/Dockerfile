FROM openjdk:8

# Create our main application folder.
RUN mkdir -p opt/dynamodb
WORKDIR /opt/dynamodb

# Download and unpack dynamodb.
# Links are from: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html
RUN wget https://s3.ap-south-1.amazonaws.com/dynamodb-local-mumbai/dynamodb_local_latest.tar.gz -q -O - | tar -xz

# The entrypoint is the dynamodb jar. Default port is 8000.
EXPOSE 8000

# Run the server
CMD ["java", "-jar", "DynamoDBLocal.jar", "-sharedDb"]
