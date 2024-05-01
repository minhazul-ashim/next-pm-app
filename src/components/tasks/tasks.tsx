import { ProjectDetail } from "@/types/type.project";
import { Col, Grid, Row } from "antd";
import React from "react";

const Tasks = ({ data }: { data: ProjectDetail | undefined }) => {
  return (
    <Row className="min-h-screen">
      <Col flex={100} className="border">
        <h2>Todo</h2>
      </Col>
      <Col flex={100} className="border">
        <h2>In Progress</h2>
      </Col>
      <Col flex={100} className="border">
        <h2>Completed</h2>
      </Col>
    </Row>
  );
};

export default Tasks;
