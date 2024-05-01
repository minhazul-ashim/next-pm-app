"use client";

import { listProjects } from "@/server/actions/projects";
import { Project, ProjectDetail } from "@/types/type.project";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Col, Flex, Row } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import AddProjectModal from "./addProject";
import ViewProjectModal from "./viewProject";

const Projects = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [initial, setInitial] = useState<Project>({} as Project);
  const { data, isError } = useQuery({
    queryKey: ["list_projects"],
    queryFn: listProjects,
  });
  if (isError) {
    <div className="">Something went wrong</div>;
  }
  const openViewModal = (e: any, el: Project) => {
    e.stopPropagation();
    const { id, title, createdAt, updatedAt, createdBy } = el;
    setView(true);
    setInitial({
      id,
      title,
      createdAt,
      updatedAt,
      createdBy,
    });
  };
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
                <Card
                  hoverable
                  title={el.title}
                  bordered={false}
                  className="border"
                >
                  <Flex vertical gap="small" align="start">
                    <small className="font-medium">
                      Created : {new Date(el.createdAt)?.toLocaleString()}{" "}
                    </small>
                    <small className="font-medium">
                      Last Updated : {new Date(el.updatedAt)?.toLocaleString()}{" "}
                    </small>
                    {el?.creator ? (
                      <small>
                        Created By:{" "}
                        {`${el?.creator?.firstName} ${el?.creator?.lastName}`}
                      </small>
                    ) : null}
                    <Flex gap="small">
                      <Button
                        key="submit"
                        type="primary"
                        onClick={(e) => openViewModal(e, el)}
                      >
                        Edit
                      </Button>

                      <Link href={`/project/${el.id}`}>
                        <Button key="submit" type="primary">
                          Details
                        </Button>
                      </Link>
                    </Flex>
                  </Flex>
                </Card>
              </Col>
            );
          })}
        </Row>
        <ViewProjectModal open={view} setOpen={setView} initial={initial} />
        <AddProjectModal open={open} setOpen={setOpen} />
      </>
    );
  }
};

export default Projects;
