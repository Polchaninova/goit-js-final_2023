
function closeModal(e) {
  if (e.code === 'Escape') {
    this.close();
  }
}

export { closeModal };