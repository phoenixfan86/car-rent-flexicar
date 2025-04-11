const proceedBtn = document.querySelector('.btn');
const carContentSection = document.getElementById('car-content');
const formSection = document.getElementById('booking-form');
const continueBtn = document.querySelector('.btn-continue');
const steps = document.querySelectorAll('.form-step');
const stepCircles = document.querySelectorAll('.step-circle');
const stepLines = document.querySelectorAll('.step-line');
const stepItems = document.querySelectorAll('.step-item');
const insureItems = document.querySelectorAll('.insurance-item');
const countryCode = document.getElementById('country-code');
const phoneNumber = document.getElementById('phone-number');

let currentStep = 0;

proceedBtn.addEventListener('click', () => {
  carContentSection.classList.add('hidden');
  formSection.classList.remove('hidden');
  window.scrollTo({ top: formSection.offsetTop, behavior: 'smooth' });
});

// Stepper
const updateStepView = () => {

  steps.forEach((step, index) => {
    step.classList.toggle('step-active', index === currentStep);
  });

  stepCircles.forEach((circle, index) => {
    circle.classList.remove('active', 'done');
    if (index < currentStep) {
      circle.classList.add('done');
    } else if (index === currentStep) {
      circle.classList.add('active');
    }
  });

  stepLines.forEach((line, index) => {
    line.classList.remove('active-line');
  });

  for (let i = 0; i < currentStep; i++) {
    const lineBefore = stepLines[i * 2 - 1];
    const lineAfter = stepLines[i * 2];
    if (lineBefore) lineBefore.classList.add('active-line');
    if (lineAfter) lineAfter.classList.add('active-line');
  }

  continueBtn.textContent = currentStep === steps.length - 1 ? 'Submit' : 'Continue';
};

continueBtn.addEventListener('click', () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    updateStepView();
  } else {
    alert('Form submitted!');
    // submit form
  }
});

stepCircles.forEach(circle => {
  circle.addEventListener('click', () => {
    const index = +circle.dataset.step;
    currentStep = index;
    updateStepView();
  });
});

// Select extras
stepItems.forEach(item => {
	const checkBox = item.querySelector('.step-checkbox');

	item.addEventListener('click', () => {
		checkBox.checked = !checkBox.checked;
		item.classList.toggle('selected', checkBox.checked);
	});
});

// Select insurance
insureItems.forEach(item => {
const insurCheckBox = item.querySelector('.insur-checkbox')

	item.addEventListener('click', () => {

    insurCheckBox.checked = !insurCheckBox.checked;

    insureItems.forEach(el => el.classList.remove('selected'));
		item.classList.toggle('selected');
	});
});

function getFullPhoneNumber() {
	return countryCode.value + ' ' + phoneNumber.value;
}

updateStepView();
