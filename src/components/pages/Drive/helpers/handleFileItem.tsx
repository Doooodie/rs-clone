export function addActiveClassOnDriveItem(e: React.MouseEvent<HTMLDivElement>) {
  e.stopPropagation();
  const allFiles = document.querySelectorAll('.file-item');
  allFiles.forEach((file) => file.classList.remove('file-item-active'));
  const target = e.currentTarget;
  target.classList.toggle('file-item-active');
}

export function removeActiveClassOnDriveItem() {
  const allFiles = document.querySelectorAll('.file-item');
  allFiles.forEach((file) => file.classList.remove('file-item-active'));
}
