import dbPool from '../database.js';

export async function findUserByEmail(email) {
  const [rows] = await dbPool.execute('SELECT * FROM User WHERE Email = ?', [email]);  
   console.log("ROWS", rows[0]);
  return rows && rows.length ? rows[0] : null;
}

export async function createUser({ name, email, password, role }) {
  const [result] = await dbPool.execute(
    'INSERT INTO User (FullName, Email, Password, Role) VALUES (?, ?, ?, ?)',
    [name, email, password, role]
  );
  console.log('createduser', result);
  return result.insertId;
}

export async function _updateUser({ email, full_name, phone }) {
  const [result] = await dbPool.execute(
    `UPDATE User SET FullName = ?, Phone = ? WHERE Email = ?`,
    [
      full_name ?? "-",
      phone ?? null, // undefined can't be used
      email
    ]
  );
  return result;
}
