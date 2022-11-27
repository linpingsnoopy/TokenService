const loki = require('lokijs');
const db = new loki('accounts');

function tidyResult(result) {
    if (result === null) return null;
    else return result.token;
}

function tidyResults(results) {
    return results.map(tidyResult);
}

function tidyAccountResult(result) {
    if (result === null) return null;
    else return result.account;
}

function tidyAccountResults(results) {
    return results.map(tidyAccountResult);
}

class AccountDao {
    constructor() {
        this.accounts = db.addCollection('accounts', { indices: ['account']});

        this.accounts.insert( {account: '4444-4444-4444-4444', token: 'He6zdCh1ReYxzZ9EKRawsi_O_aRykQTV'});
        this.accounts.insert( {account: '3333-3333-3333-3333', token: 'fvMymE7X0Je1IzMDgWooV5iGBPw0yoFy'});

    }

    list() {
        return tidyResults(this.accounts.find());
    }

    getById(account) {
        return tidyResult( this.accounts.findOne({'account': { '$eq' : account }}) );
    }

    getTokensByAccounts(accounts) {
        return tidyResults( this.accounts.find({'account': { '$containsAny' : accounts }}) );
    }

    getAccountsByTokens(tokens) {
        return tidyAccountResults( this.accounts.find({'token': { '$containsAny' : tokens }}) );
    }

    putAccount(account) {
        return tidyResult( this.accounts.insert(account) );
    }

    putAccounts(accounts) {
        const result = [];
        for(var i=0;i<accounts.length;i++) {
            result.push( tidyResult( this.accounts.insert(account) ) );
        }
        return results;
    }
}

module.exports = AccountDao;