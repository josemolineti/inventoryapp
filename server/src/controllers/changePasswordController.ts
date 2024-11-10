import bcrypt from 'bcrypt';
import db from '../database/db'; 

export const changePassword = (email: string, newPassword: string, callback: (error: Error | null, result: any) => void) => {
  bcrypt.hash(newPassword, 10, (err, hash) => {
    if (err) {
      callback(err, null);
      return;
    }

    const query = `UPDATE usuario SET senha = ? WHERE email = ?`;
    db.run(query, [hash, email], function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { changedRows: this.changes });
      }
    });
  });
};
