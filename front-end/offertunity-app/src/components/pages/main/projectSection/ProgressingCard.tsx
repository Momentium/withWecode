import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface Props {
  data: any;
  index: number;
}

const ProgressingCard: React.FC<Props> = ({ data, index }) => {
  const { id, name, project_images, due_date, host, introduction, tag } = data;
  const dueDate = due_date.split("T")[0];

  const noImg = {
    paddingTop: "0",
  };

  return (
    <Card key={index} id={id}>
      <Link to={`/project/detail/${id}`} key={index}>
        <img
          src={project_images ? project_images : "/images/header/logo.png"}
          alt={name}
        />
        {!project_images && <span className="noImg">이미지가 없습니다</span>}
        <div className={project_images ? "txtBox" : "noProgectImg"}>
          <Subtitle>{host}</Subtitle>
          <Date>~{dueDate} 까지</Date>
        </div>
        <Title>{introduction}</Title>

        {tag.map((tag: any, idx: number) => {
          return <Tag key={idx}>{tag}</Tag>;
        })}
      </Link>
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
    display: inline-block;
    width: 100%;
    height: 11rem;
  }
  .txtBox {
    display: flex;
    padding: 1rem 0;
    justify-content: space-between;
  }
  &:nth-child(3n) {
    margin-right: 0;
  }
  .noImg {
    font-size: 0.5rem;
    color: #9f9f9f;
  }
  .noProgectImg {
    display: flex;
    padding-bottom: 1rem;
    justify-content: space-between;
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
