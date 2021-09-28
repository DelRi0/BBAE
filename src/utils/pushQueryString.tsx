interface IProps {
  router: any
  dataChange: any
  pathname?: string
}

const pushQueryString = ({ router, dataChange, pathname }: IProps) => {
  if (!router) {
    throw new Error("router is not empty")
  }
  const dataQueryString = router.query
  return router.push({
    pathname: pathname ? pathname : router.pathname,
    query: {
      ...dataQueryString,
      ...dataChange,
    },
  })
}

export default pushQueryString
