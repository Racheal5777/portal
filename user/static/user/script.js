document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('userForm');
  const submitBtn = document.getElementById('submit-btn');
  const notice = document.getElementById('notice');
  const profileInput = document.getElementById('profile_picture');
  const profilePreview = document.getElementById('profilePreview');
  const videoInput = document.getElementById('video_resume');
  const videoLabel = document.getElementById('videoLabel');

  // Preview for selected profile picture
  profileInput?.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (file && profilePreview) {
      const reader = new FileReader();
      reader.onload = (ev) => profilePreview.src = ev.target.result;
      reader.readAsDataURL(file);
    }
  });

  // Show selected filename for video input
  videoInput?.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (file && videoLabel) videoLabel.textContent = file.name;
  })

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving...';

    fetch('', {
      method: 'POST',
      body: formData
    })
    .then(resp => resp.json())
    .then(data => {
      notice.style.display = 'block';
      notice.textContent = data.message || 'Saved successfully';
      setTimeout(()=>{ notice.style.display = 'none'; }, 3500);
      form.reset();
      if (profilePreview) profilePreview.src = '';
      videoLabel.textContent = 'No video selected';
    })
    .catch(err => {
      notice.style.display = 'block';
      notice.textContent = 'Unable to save — please try again.';
      notice.style.background = 'rgba(255,235,238,0.8)';
      notice.style.color = '#ef4444';
    })
    .finally(()=>{
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit';
    })
  })
})
