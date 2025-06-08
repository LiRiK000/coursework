import type { FormData as CourseFormData } from '../model/schema';

export const courseAdapter = (data: CourseFormData): globalThis.FormData => {
  const formData = new globalThis.FormData();

  // Добавляем основную информацию
  formData.append('title', data.step1.title);
  formData.append('description', data.step1.description);
  formData.append('category', data.step1.category);
  formData.append('level', data.step1.level);

  if (data.step1.coverImage) {
    formData.append('coverImage', data.step1.coverImage);
  }

  // Добавляем блоки
  data.blocks.forEach((block, index) => {
    formData.append(`blocks[${index}][id]`, block.id);
    formData.append(`blocks[${index}][title]`, block.title);
    formData.append(`blocks[${index}][content]`, block.content);

    if (block.theoreticalMaterial) {
      formData.append(
        `theoreticalMaterial_${index}`,
        block.theoreticalMaterial,
      );
    }

    // Добавляем тест
    if (block.test) {
      formData.append(`blocks[${index}][test][id]`, block.test.id);
      formData.append(`blocks[${index}][test][title]`, block.test.title);
      formData.append(
        `blocks[${index}][test][description]`,
        block.test.description || '',
      );
      formData.append(
        `blocks[${index}][test][passingScore]`,
        block.test.passingScore.toString(),
      );

      // Добавляем вопросы
      block.test.questions.forEach((question, qIndex) => {
        formData.append(
          `blocks[${index}][test][questions][${qIndex}][id]`,
          question.id,
        );
        formData.append(
          `blocks[${index}][test][questions][${qIndex}][question]`,
          question.question,
        );

        // Добавляем варианты ответов
        question.options.forEach((option, oIndex) => {
          formData.append(
            `blocks[${index}][test][questions][${qIndex}][options][${oIndex}][id]`,
            option.id,
          );
          formData.append(
            `blocks[${index}][test][questions][${qIndex}][options][${oIndex}][text]`,
            option.text,
          );
          formData.append(
            `blocks[${index}][test][questions][${qIndex}][options][${oIndex}][isCorrect]`,
            option.isCorrect.toString(),
          );
        });
      });
    }
  });

  return formData;
};
