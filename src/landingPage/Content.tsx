import AgeMessage from "./AgeMessage";
import { useDateOfBirthForm } from "../hooks/use-date-of-birth-form";

const Content = () => {
  const {
    maximumDate,
    dateOfBirth,
    handleChange,
    handleSubmit,
    handleBlur,
    errorMessage,
    isValid,
    age,
  } = useDateOfBirthForm();

  return (
    <section className="main-content" data-testid="businesses-view">
      <div className="content">
        <div className="form-container">
          <AgeMessage age={age} />
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label className="form-label" htmlFor="date_of_birth">
                Date of Birth
              </label>
              <div className="input-group">
                <input
                  value={dateOfBirth}
                  onChange={handleChange}
                  className="date-picker"
                  type="date"
                  id="date_of_birth"
                  max={maximumDate}
                  onBlur={handleBlur}
                />
                <div className="error-message">{errorMessage}</div>
              </div>
            </div>
            <div className="button-wrapper">
              <button
                disabled={!isValid}
                type="submit"
                className={
                  "btn " + (isValid ? "submit-button" : "disabled-button")
                }
              >
                Calculator
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Content;
