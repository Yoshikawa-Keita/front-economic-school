import { ApiContext, Exam, ExamCountByUniversity } from '@/types';
import { fetcher } from '@/utils';
import Cookies from 'js-cookie';

export type GetExamCountByUniversityResponse = {
  examCountByUniversity: ExamCountByUniversity[];
};

const getExamCountByUniversity = async (
  context: ApiContext,
): Promise<GetExamCountByUniversityResponse> => {
  const response: GetExamCountByUniversityResponse = await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/v1/get_exam_count_by_university`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('accessToken')}`
      },
    },
  );

  return response;
};

export { getExamCountByUniversity };
