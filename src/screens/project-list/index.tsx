import React, { useEffect, useState } from "react";
import { SearchPanel } from "screens/project-list/search-panel";
import { Project, List } from "screens/project-list/list";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { useAsync } from "utils/use-async";
import { useHttp } from "utils/http";

import styled from "@emotion/styled";
// 使用 JS 的同学，大部分的错误都是在 runtime(运行时) 的时候发现的
// 我们希望，在静态代码中，就能找到其中的一些错误 -> 强类型
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 200);
  // const [list, setList] = useState([]);
  const client = useHttp();
  const { run, isLoading, data } = useAsync<Project[]>();
  useEffect(() => {
    run(client("projects", { data: cleanObject(debouncedParam) }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List loading={isLoading} users={users || []} dataSource={data || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
