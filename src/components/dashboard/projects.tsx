"use client";

import { listProjects } from "@/server/actions/projects";
import { ProjectDetail } from "@/types/type.project";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Flex, Row } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import AddProjectModal from "./addProject";

const Projects = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isError } = useQuery({
    queryKey: ["list_projects"],
    queryFn: listProjects,
  });
  if (isError) {
    <div className="">Something went wrong</div>;
  }
  if (data) {
    return (
      <>
        <Row gutter={[12, 12]}>
          <Col
            className="gutter-row"
            sm={{ flex: "100%" }}
            md={{ flex: "50%" }}
            lg={{ flex: "33%" }}
            xl={{ flex: "20%" }}
          >
            <Card
              hoverable
              bordered={false}
              className="flex h-full items-center justify-center border"
              onClick={ () => setOpen(true) }
            >
              <h2 className="flex items-center text-lg font-medium">
                <MdCreateNewFolder fontSize={40} className="mr-4" /> Add New
                Project
              </h2>
            </Card>
          </Col>
          {data?.map((el: ProjectDetail) => {
            return (
              <Col
                className="gutter-row"
                key={el.id}
                sm={{ flex: "100%" }}
                md={{ flex: "50%" }}
                lg={{ flex: "33%" }}
                xl={{ flex: "20%" }}
              >
                <Link href={`/project/${el.id}`}>
                  <Card
                    hoverable
                    title={el.title}
                    bordered={false}
                    className="border"
                  >
                    <Flex vertical gap="small">
                      <small className="font-medium">
                        Created : {new Date(el.createdAt)?.toLocaleString()}{" "}
                      </small>
                      <small className="font-medium">
                        Last Updated :{" "}
                        {new Date(el.updatedAt)?.toLocaleString()}{" "}
                      </small>
                      {el?.creator ? (
                        <small>
                          Created By:{" "}
                          {`${el?.creator?.firstName} ${el?.creator?.lastName}`}
                        </small>
                      ) : null}
                    </Flex>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
        <AddProjectModal open={open} setOpen={setOpen} />
      </>
    );
  }
};

export default Projects;
