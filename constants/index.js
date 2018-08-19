const DATABASE_ERROR_CODE = {
    'DUPLICATE': 11000
}
const PAYBACK_AMOUNT = {
    DIRECT_PARENT: 30,
    FIRST_LEVEL_AMBASSADOR: 10
}
const PAYBACK_RETRY = { interval: 5000, maxRetry: 5 }; // mil secs

/**
 * Export all the app level constants
 */

module.exports = {
    DATABASE_ERROR_CODE,
    PAYBACK_AMOUNT,
    PAYBACK_RETRY
};