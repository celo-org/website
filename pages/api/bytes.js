import respondError from 'server/respondError';
export default async function (_, res) {
    try {
        res.write(Buffer.alloc(300, 'Celo is '));
        res.end();
    }
    catch (e) {
        respondError(res, e);
    }
}
//# sourceMappingURL=bytes.js.map