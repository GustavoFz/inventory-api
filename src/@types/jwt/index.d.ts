interface DecodedProps {
    id: string
}

declare global {
    namespace JsonWebToken {
        export interface JwtPayload {
            decoded: Partial<DecodedProps>;
        }
    }
}