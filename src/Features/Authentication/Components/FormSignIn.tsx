import { Form, FormBlock, FormContainer } from "@Components/Form";
import { DarkButton } from "@Components/UI/Buttons";
import { Input } from "@Components/UI/Inputs";
import { Text } from "@Components/UI/Labels";
import { Preloader } from "@Components/UI/Preloaders";
import { Link } from "react-router-dom";

const FormSignIn = () => {
  const isLoading = false;
  const errors = {
    emailError: "",
    passwordError: "",
  };

  return (
    <FormContainer>
      <Form method="post">
        <FormBlock>
          <Input
            type="email"
            name="email"
            placeholder="Enter email"
            disabled={isLoading}
          />
          <Text color="#d62424" fontSize="14px">
            {errors?.emailError}
          </Text>
        </FormBlock>
        <FormBlock>
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
        <DarkButton type="submit" disabled={isLoading}>
          Sign In
        </DarkButton>
        {isLoading && <Preloader width={20} />}
        <div>
          <Text color="#808080">Don't have an account? </Text>
          <Link to="/signup" className="link-primary">
            Sign up
          </Link>
        </div>
      </Form>
    </FormContainer>
  );
};

export default FormSignIn;
