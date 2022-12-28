export const MOCK_VALID_FILE_INPUT = {
  "apple.mac.macbook.macbook-air":
    "Apple의 가장 사랑받는 노트북, MacBook Air가 막강한 성능의 M1 및 M2 칩을 탑재했습니다. 여기에 FaceTime HD 카메라, Touch ID, 선명한 Retina 디스플레이까지 갖추고 있죠.",
  "apple.mac.macbook.macbook-pro":
    "Apple의 가장 강력한 노트북, MacBook Pro가 막강한 성능의 M1 및 M2 칩을 탑재했습니다. 여기에 Magic Keyboard, Touch ID, 선명한 Retina 디스플레이까지 갖추었죠.",
  "samsung.pc.galaxybook.galaxybook2-pro-360":
    "갤럭시 북2, 갤럭시북 Pro 360, 포터블 SSD T7 USB 3.2 Gen 2 500 GB, 갤럭시 북, NT930QED-KD71G, MU-PC500T/WW, NT930QED-KX71G",
  "samsung.mobile.galaxy-z.filp4":
    "갤럭시 Z 플립4의 특장점을 확인해보세요.빠르게 충전하고 오래 사용하는 배터리, 사진/영상 촬영에 최적화된 셀피 카메라, 엣지 있는 투톤 컬러와 매트한 질감의 아이코닉 디자인",
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
