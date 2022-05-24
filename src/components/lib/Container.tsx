import styled from "@emotion/styled";
import React from "react";
import { Container } from "react-bootstrap";

const MyStyledContainer = styled.div`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default MyStyledContainer.withComponent(Container);
