// 모든 유저 조회
async function selectUser(connection) {
    const selectUserListQuery = `
                  SELECT email, name 
                  FROM UserInfo;
                  `;
    const [userRows] = await connection.query(selectUserListQuery);
    return userRows;
}

// 이메일로 회원 조회
async function selectUserEmail(connection, email) {
    const selectUserEmailQuery = `
                  SELECT email, name 
                  FROM UserInfo 
                  WHERE email = ?;
                  `;
    const [emailRows] = await connection.query(selectUserEmailQuery, email);
    return emailRows;
}

// userId 회원 조회
async function selectUserId(connection, userId) {
    const selectUserIdQuery = `
                   SELECT id, email, name 
                   FROM UserInfo 
                   WHERE id = ?;
                   `;
    const [userRow] = await connection.query(selectUserIdQuery, userId);
    return userRow;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
    const insertUserInfoQuery = `
          INSERT INTO UserInfo(email, password, name)
          VALUES (?, ?, ?);
      `;
    const insertUserInfoRow = await connection.query(
        insertUserInfoQuery,
        insertUserInfoParams
    );

    return insertUserInfoRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
    const selectUserPasswordQuery = `
          SELECT email, name, password
          FROM UserInfo 
          WHERE email = ? AND password = ?;`;
    const selectUserPasswordRow = await connection.query(
        selectUserPasswordQuery,
        selectUserPasswordParams
    );

    return selectUserPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, email) {
    const selectUserAccountQuery = `
          SELECT status, id
          FROM UserInfo 
          WHERE email = ?;`;
    const selectUserAccountRow = await connection.query(
        selectUserAccountQuery,
        email
    );
    return selectUserAccountRow[0];
}

async function updateUserInfo(connection, id, name) {
    const updateUserQuery = `
    UPDATE UserInfo 
    SET name = ?
    WHERE id = ?;`;
    const updateUserRow = await connection.query(updateUserQuery, [name, id]);
    return updateUserRow[0];
}


module.exports = {
    selectUser,
    selectUserEmail,
    selectUserId,
    insertUserInfo,
    selectUserPassword,
    selectUserAccount,
    updateUserInfo,
};