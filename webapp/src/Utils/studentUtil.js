import { graphQLRequest } from './request';

export async function joinClass(classId, courseId) {
    const query = `
        mutation JoinClass($classId: String!, $courseId: String!) {
            joinClass(classId: $classId, courseId: $courseId)
        }
    `;

    const data = await graphQLRequest({
        query,
        variables: {
            classId: classId,
            courseId: courseId
        }
    });

    if (data.errors && data.errors.length > 0) {
        const firstError = data.errors[0];
        const errorMessage = firstError?.message || 'Có lỗi xảy ra khi tham gia lớp học';
        const error = new Error(errorMessage);
        error.graphQLErrors = data.errors;
        throw error;
    }

    return data.data?.joinClass === true;
}


export async function getStudentSchedules() {
    const query = `
        query GetStudentSchedules {
            getStudentSchedules {
                tutorName
                courseName
                day
                method
                start
                end
            }
        }
    `;

    const data = await graphQLRequest({
        query
    });

    // if (data.errors && data.errors.length > 0) {
    //     const firstError = data.errors[0];
    //     const errorMessage = firstError?.message || 'Có lỗi xảy ra khi lấy lịch học';
    //     const error = new Error(errorMessage);
    //     error.graphQLErrors = data.errors;
    //     throw error;
    // }

    return data.data?.getStudentSchedules || [];
}