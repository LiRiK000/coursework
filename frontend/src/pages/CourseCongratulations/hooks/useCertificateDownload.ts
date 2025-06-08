import { message } from 'antd';
import { courseService } from '@/shared/service/CourseService';
import { useUser } from '@/entities/User';

export const useCertificateDownload = () => {
  const email = useUser((store) => store.email);
  const downloadCertificate = async (courseId: string) => {
    try {
      const response = await courseService.downloadCertificate({
        email,
        courseName: courseId,
        courseId,
      });
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate-${courseId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      message.error('Ошибка при скачивании сертификата');
      console.error(error, 'error');
    }
  };

  return { downloadCertificate };
};
