import React from "react";
import styled from "styled-components";

interface Props {
  data: any;
  index: number;
}

const NewCard: React.FC<Props> = ({ data, index }) => {
  const { id, name, project_images, due_date, host, introduction } = data;
  const dueDate = due_date.split("T")[0];

  return (
    <Card key={index}>
      <Number>{index}</Number>
      <TxtWrap>
        <Newtitle>{name}</Newtitle>
        <NewMinititle>{host}</NewMinititle>
        <NewDate>~{dueDate} 까지</NewDate>
      </TxtWrap>
      <img
        src={project_images ? project_images : "/images/header/logo.png"}
        alt={name}
      />
    </Card>
  );
};

export default NewCard;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1.56rem;
  cursor: pointer;
  img {
    width: 7.5rem;
    height: 5rem;
  }
`;

const Number = styled.span`
  font-size: 1.75rem;
  font-weight: bold;
`;

const TxtWrap = styled.div`
  display: inline-block;
  width: 15rem;
  padding: 0 1.25rem;
`;

const Newtitle = styled.p`
  font-size: 0.9rem;
`;

const NewMinititle = styled.p`
  margin: 0.3rem 0;
  font-size: 0.8rem;
  color: #9f9f9f;
`;

const NewDate = styled.p`
  font-size: 0.8rem;
  color: #5541ed;
`;
