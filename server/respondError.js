export default function respondError(res, error) {
    res.status(error.statusCode || 500).json({ message: error.message || "unknownError" });
}
//# sourceMappingURL=respondError.js.map