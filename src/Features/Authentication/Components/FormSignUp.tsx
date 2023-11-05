import { Form, FormBlock, FormContainer } from "@Components/Form";
import { DarkButton } from "@Components/UI/Buttons";
import { Input } from "@Components/UI/Inputs";
import { Text } from "@Components/UI/Labels";
import { Preloader } from "@Components/UI/Preloaders";
import { Link, useActionData } from "react-router-dom";

const FormSignUp = () => {
  const isLoading = false;
  const formErrors = useActionData();

  if (formErrors) alert(formErrors.error);

  const errors = {
    emailError: "",
    passwordError: "",
  };
  return (
    <FormContainer>
      <Form method="post">
        <FormBlock>
          <Text color="#808080">Email</Text>
          <Input
            type="email"
            placeholder="Enter email"
            name="email"
            disabled={isLoading}
          />
          <Text color="#d62424" fontSize="14px">
            {errors?.emailError}
          </Text>
        </FormBlock>
        <FormBlock>
          <Text color="#808080">Fullname</Text>
          <Input
            type="text"
            placeholder="Enter your name"
            name="name"
            disabled={isLoading}
          />
          <Text color="#d62424" fontSize="14px">
            {errors?.emailError}
          </Text>
        </FormBlock>
        <FormBlock>
          <Text color="#808080">Date of birth</Text>
          <Input
            type="date"
            placeholder="Enter your name"
            name="birthDate"
            disabled={isLoading}
          />
          <Text color="#d62424" fontSize="14px">
            {errors?.emailError}
          </Text>
        </FormBlock>
        <FormBlock>
          <Text color="#808080">Password</Text>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            disabled={isLoading}
          />
          <Text color="#d62424" fontSize="14px">
            {errors?.passwordError}
          </Text>
        </FormBlock>
        <FormBlock>
          <Text color="#808080">Confirm password</Text>

          <Input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            disabled={isLoading}
          />
        </FormBlock>
        <DarkButton disabled={isLoading}>Sign Up</DarkButton>
        {isLoading && <Preloader width={20} />}
        <div>
          <Text color="#808080">Already have an account? </Text>
          <Link to="/app/signin" className="link-primary">
            Sign in
          </Link>
        </div>
      </Form>
    </FormContainer>
  );
};

export default FormSignUp;
