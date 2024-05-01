"use client";

import { listMembers } from "@/server/actions/members";
import { Member } from "@/types/type.member";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row } from "antd";
import React from "react";

const Members = () => {
  const { data, isError } = useQuery({
    queryKey: ["list_members"],
    queryFn: listMembers,
  });
  if (isError) {
    <div className="">Something went wrong</div>;
  }
  if (data) {
    return (
      <>
        <Row gutter={[12, 12]}>
          {data?.map((el: Member) => {
            return (
              <Col
                className="gutter-row w-full"
                key={el.id}
                sm={{ flex: "100%" }}
                md={{ flex: "50%" }}
                lg={{ flex: "33%" }}
                xl={{ flex: "20%" }}
              >
                <Card
                  hoverable
                  title={`${el.firstName} ${el.lastName}`}
                  bordered={false}
                  className="w-full border"
                >
                  <p className="text-medium text-sm">Email: {el.email} </p>
                </Card>
              </Col>
            );
          })}
        </Row>
      </>
    );
  }
};

export default Members;
