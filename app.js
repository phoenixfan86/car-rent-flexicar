  const proceedBtn = document.querySelector('.btn');
  const carContentSection = document.getElementById('car-content');
  const formSection = document.getElementById('booking-form');
  const continueBtn = document.querySelector('.btn-continue');
  const steps = document.querySelectorAll('.form-step');
  const stepCircles = document.querySelectorAll('.step-circle');

  let currentStep = 0;

  proceedBtn.addEventListener('click', () => {
    carContentSection.classList.add('hidden');
    formSection.classList.remove('hidden');
    window.scrollTo({ top: formSection.offsetTop, behavior: 'smooth' });
  });

  const updateStepView = () => {
    steps.forEach((step, index) => {
      step.classList.toggle('step-active', index === currentStep);
    });

    stepCircles.forEach((circle, index) => {
      circle.classList.toggle('active', index <= currentStep);
    });

    continueBtn.textContent = currentStep === steps.length - 1 ? 'Submit' : 'Continue';
  };

  continueBtn.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      updateStepView();
    } else {
      alert('Form submitted!');
      // Тут буде форма: .submit() або щось інше
    }
  });

  stepCircles.forEach(circle => {
    circle.addEventListener('click', () => {
      const index = +circle.dataset.step;
      currentStep = index;
      updateStepView();
    });
  });

  updateStepView();
