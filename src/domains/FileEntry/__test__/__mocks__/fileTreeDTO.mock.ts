export const MOCK_VALID_FILE_INPUT = {
  "root.parent.child.child-1.child__2": "1",
};

export const MOCK_INVALID_FILE_INPUT_1 = {
  "root/child/child": "MOCK FILE CONTENT",
};
export const MOCK_INVALID_FILE_INPUT_2 = {
  "root/.child/.child": "MOCK FILE CONTENT",
};
export const MOCK_INVALID_FILE_INPUT_3 = {
  "루트.자식.자식": "MOCK FILE CONTENT",
};
export const MOCK_INVALID_FILE_INPUT_4 = {
  "root.parent.child": 1,
};
export const MOCK_INVALID_FILE_INPUT_5 = {
  "root.parent.child": {},
};
export const MOCK_INVALID_FILE_INPUT_6 = {
  "root.parent.child": null,
};
export const MOCK_INVALID_FILE_INPUT_7 = {
  "root.parent.child": undefined,
};
