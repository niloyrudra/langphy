let currentUserId: string | null = null;
let currentToken: string | null = null;

export const authSnapshot = {
    set(userId: string, token: string) {
        currentUserId = userId;
        currentToken = token;
    },

    clear() {
        currentUserId = null;
        currentToken = null;
    },

    getUserId() {
        return currentUserId;
    },

    getToken() {
        return currentToken;
    },

    isReady() {
        return !!currentUserId && !!currentToken;
    },
};
