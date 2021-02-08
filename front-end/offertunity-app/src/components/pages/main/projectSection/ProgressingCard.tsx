import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface Props {
  data: any;
  index: number;
}

const ProgressingCard: React.FC<Props> = ({ data, index }) => {
  const { id, name, project_images, due_date, host, introduction } = data;

  const dueDate = due_date.split("T")[0];
  const image = data.project_images;

  console.log(image);

  return (
    <Card key={id}>
      {/* <img src={image} alt={name} /> */}
      <div className="txtBox">
        <Subtitle>{host}</Subtitle>
        <Date>~{dueDate} 까지</Date>
      </div>
      <Title>{introduction}</Title>

      {/* {tag.map((tag:any,idx: number) => {
          return <Tag key={idx}>{tag}</Tag>
        })} */}
    </Card>
  );
};

export default ProgressingCard;

const Card = styled.li`
  display: inline-block;
  margin: 0 1.62rem 1.5rem 0;
  width: 16rem;
  cursor: pointer;
  img {
    width: 100%;
    height: 11rem;
  }
  .txtBox {
    display: flex;
    padding: 0.75rem 0;
    justify-content: space-between;
  }
  &:nth-child(3n) {
    margin-right: 0;
  }
`;

const Date = styled.span`
  font-size: 0.8rem;
  color: #5541ed;
`;
const Subtitle = styled.span`
  font-size: 0.81rem;
  color: #9f9f9f;
`;

const Title = styled.p`
  padding-bottom: 0.94rem;
  font-size: 0.93rem;
  font-weight: bold;
`;

const Tag = styled.span`
  margin-right: 0.37rem;
  padding: 0.3rem;
  font-size: 0.68rem;
  color: #c3bdf4;
  border: 1px solid #c3bdf4;
`;