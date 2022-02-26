const housingPhotoElement = document.querySelector('.ad-form__photo');
const housingPhotoFileElement = document.querySelector('.ad-form__input');
const avatarElement = document.querySelector('.ad-form-header__preview');
const avatarFileElement = document.querySelector('.ad-form-header__input');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

avatarFileElement.addEventListener('change', () => {
  const file = avatarFileElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));
  if(matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => avatarElement.firstElementChild.src = reader.result);
    reader.readAsDataURL(file);
  }
});

housingPhotoFileElement.addEventListener('change', () => {
  const file = housingPhotoFileElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));
  if(matches) {
    const reader = new FileReader();
    if(housingPhotoElement.firstElementChild) {
      housingPhotoElement.firstElementChild.remove();
    }
    housingPhotoElement.insertAdjacentHTML('afterbegin', '<img src="" width="70" height="70">');
    reader.addEventListener('load', () => housingPhotoElement.firstElementChild.src = reader.result);
    reader.readAsDataURL(file);
  }
});

function resetPhoto() {
  if(housingPhotoElement.firstElementChild) {
    housingPhotoElement.firstElementChild.remove();
  }
  avatarElement.firstElementChild.src = 'img/muffin-grey.svg';
}

export { resetPhoto };
