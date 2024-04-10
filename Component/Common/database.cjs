const { Client } = require('pg');

const connectToDatabase = () => {
    const FPC = {
        user: "fpc",
        password: "fpc",
        connectString: "PCTTLIV",
    };

    const SMT = {
        user: "SMT",
        password: "SMT",
        connectString: "NAPKDBSV",
    };

    const pgFETLPSQL_A1 = {
        user: "fetltrace",
        host: "10.17.66.120",
        database: "FETLPSQL_A1",
        password: "f3tltr@c3",
        port: 5432,
    };

    const client = new Client(pgFETLPSQL_A1);
    client.connect();

    return { FPC, SMT, pgFETLPSQL_A1, client };
};

module.exports = connectToDatabase;