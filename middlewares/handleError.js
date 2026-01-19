export default function handleError(err, req, res, next) {
    res. status(500);
    return res.json({
        error: process.env.ENVIRONMENT === "development" ? err : "INTERNAL ERROR", //Ternario: Se process.env.environment è ugualea development, allora mettimi tutto il errore, altrimenti metti il codice internal error
        message: "Internal server error"
    });
}