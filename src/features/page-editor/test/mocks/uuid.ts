const TEST_UUID = "test-uuid";

export const setupUuidMock = () => {
  const uuidMock = jest.requireMock("uuid");
  uuidMock.v4 = jest.fn().mockReturnValue(TEST_UUID);
};
