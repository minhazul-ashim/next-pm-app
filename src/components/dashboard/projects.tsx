"use client";

import { listProjects } from "@/server/actions/projects";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row } from "antd";
import React from "react";

const Projects = () => {
  const { data, isError } = useQuery({
    queryKey: ["list_projects"],
    queryFn: listProjects,
  });
  if (isError) {
    <div className="">Something went wrong</div>;
  }
  if (data) {
    return (
      <Row gutter={[12, 12]}>
        {data.map((el) => {
          return (
            <Col
              className="gutter-row"
              key={el.id}
              xs={{ flex: "100%" }}
              sm={{ flex: "100%" }}
              md={{ flex: "50%" }}
              lg={{ flex: "33%" }}
              xl={{ flex: "20%" }}
            >
              <Card hoverable title="Card title" bordered={false}>
                Card content
              </Card>
            </Col>
          );
        })}
        <Col
          className="gutter-row"
          xs={{ flex: "100%" }}
          sm={{ flex: "100%" }}
          md={{ flex: "50%" }}
          lg={{ flex: "33%" }}
          xl={{ flex: "20%" }}
        >
          <Card hoverable title="Card title" bordered={false}>
            Add New Project
          </Card>
        </Col>
      </Row>
    );
  }
};

export default Projects;
