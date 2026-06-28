export const queryKeys = {
    categories: {
        all: ["categories"],
    },
    inquiries: {
        all: ["inquiries"],
        mine: (userId) => ["inquiries", "mine", userId],
        detail: (id) => ["inquiries", id],
    },
    bids: {
        all: ["bids"],
        byInquiry: (inquiryId) => ["bids", { inquiryId }],
    },
}
