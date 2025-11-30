import dbPool from '../database.js';

const MAX_STUDENTS_PER_CLASS = 5;

export async function joinClass(studentId, classId, courseId) {
    // try {
    //     const [countRows, courseRows] = await Promise.all([
    //         dbPool.execute(
    //             'SELECT COUNT(*) as count FROM `StudentOfClass` WHERE ClassID = ?',
    //             [classId]
    //         ),
    //         dbPool.execute(
    //             'SELECT IsInClass FROM `CourseRegistration` WHERE UserID = ? AND CourseID = ?',
    //             [studentId, courseId]
    //         )
    //     ]);

    //     const currentCount = countRows[0]?.[0]?.count || 0;
    //     const isCourseRegistered = courseRows[0]?.[0]?.IsInClass || 0;
    //     if (isCourseRegistered) {
    //         const e = new Error('CourseAlreadyRegistered');
    //         e.code = 'COURSE_ALREADY_REGISTERED';
    //         throw e;
    //     }

    //     if (currentCount >= MAX_STUDENTS_PER_CLASS) {
    //         const e = new Error('ClassFull');
    //         e.code = 'CLASS_FULL';
    //         throw e;
    //     }

    //     const [[result], [courseResult]] = await Promise.all([
    //         dbPool.execute(
    //             'INSERT INTO `StudentOfClass` (StudentID, ClassID) VALUES (?, ?)',
    //             [studentId, classId]
    //         ),
    //         dbPool.execute(
    //             'UPDATE `CourseRegistration` SET IsInClass = 1 WHERE UserID = ? AND CourseID = ?',
    //             [studentId, courseId]
    //         )
    //     ]);

    //     return result.affectedRows > 0 && courseResult.affectedRows > 0;
    // } catch (err) {
    //     if (err.code === 'CLASS_FULL' || err.code === 'COURSE_ALREADY_REGISTERED') {
    //         throw err;
    //     }
    //     throw err;
    // }

    try {
        const [rows] = await dbPool.execute(
            'SELECT COUNT(*) as count FROM `StudentOfClass` WHERE ClassID = ?',
            [classId]
        );

        const currentCount = rows[0]?.[0]?.count || 0;
        if (currentCount >= MAX_STUDENTS_PER_CLASS) {
            const e = new Error('ClassFull');
            e.code = 'CLASS_FULL';
            throw e;
        }

        const [result] = await dbPool.execute(
            'INSERT INTO `StudentOfClass` (ClassID, StudentID, CourseID) VALUES (?, ?, ?)',
            [classId, studentId, courseId]
        );

        return result.affectedRows > 0;
    } catch (err) {
        if (err.sqlState === '45000') { 
            const e = new Error('ScheduleConflict');
            e.code = 'SCHEDULE_CONFLICT';
            throw e;
        }

        if (err.sqlState === '45009'  || err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
            const e = new Error('CourseAlreadyRegistered');
            e.code = 'COURSE_ALREADY_REGISTERED';
            throw e;
        }
        if (err.code === 'CLASS_FULL') {
            const e = new Error('ClassFull');
            e.code = 'CLASS_FULL';
            throw e;
        }
        throw err;
    }
}

// export async function getMyClasses(studentId) {
//     try {
//         const [rows] = await dbPool.execute(
//             `
//             SELECT DISTINCT
//                 c.Cid AS CourseID,
//                 c.Cname AS CourseName,
//                 c.Faculty AS CourseFaculty,
//                 u.UserID AS TutorID,
//                 u.FullName AS TutorName,
//                 cls.ClassID,
//                 cls.StartTime,
//                 cls.EndTime,
//                 cls.TeachingDay,
//                 cls.method
//             FROM StudentOfClass sc
//             JOIN Class cls ON sc.ClassID = cls.ClassID
//             JOIN User u ON cls.TutorID = u.UserID
//             JOIN TutorCourseRegistration tcr ON u.UserID = tcr.UserID
//             JOIN Course c ON tcr.CourseID = c.Cid
//             WHERE sc.StudentID = ?
//             ORDER BY c.Cname, cls.TeachingDay
//             `,
//             [studentId]
//         );

//         return rows || [];
//     } catch (err) {
//         console.error('Error in getMyClasses:', err.message);
//         throw err;
//     }
// }

export async function getStudentSchedules(studentId) {
    try {
        const [rows] = await dbPool.execute(
            `
            SELECT 
                co.Cid AS CourseID,
                co.Cname AS CourseName,
                co.Faculty AS CourseFaculty,
                u.UserID AS TutorID,
                u.FullName AS TutorName,
                c.ClassID,
                c.StartTime,
                c.EndTime,
                c.method,
                c.TeachingDay
            FROM StudentOfClass soc
            JOIN Class c ON soc.ClassID = c.ClassID
            JOIN User u ON c.TutorID = u.UserID
            JOIN Course co ON soc.CourseID = co.Cid
            WHERE soc.StudentID = ?
            ORDER BY co.Cname, c.TeachingDay, c.StartTime
            `,
            [studentId]
        );

        return rows || [];
    } catch (err) {
        console.error('Error in getStudentSchedules:', err.message);
        throw err;
    }
} 