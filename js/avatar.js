const avatarPreview = document.querySelector('.ad-form-header__preview img');
const avatarFile = document.querySelector('.ad-form-header__input');
const housingPreviewContainer = document.querySelector('.ad-form__photo');
const housingPictureFile = document.querySelector('.ad-form__input');


const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

avatarFile.addEventListener('change', () => {
  const file = avatarFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));
  if(matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => avatarPreview.src = reader.result);
    reader.readAsDataURL(file);
  }
});


housingPictureFile.addEventListener('change', () => {
  const file = housingPictureFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));
  if(matches) {
    const reader = new FileReader();
    housingPreviewContainer.innerHTML='';
    housingPreviewContainer.insertAdjacentHTML('afterbegin', '<img src="" width="70" height="70">');
    reader.addEventListener('load', () => housingPreviewContainer.querySelector('img').src = reader.result);
    reader.readAsDataURL(file);
  }
});
