import {
  MutationHookOptions,
  QueryHookOptions,
  gql,
  useLazyQuery,
  useMutation,
  useQuery,
} from '@apollo/client'

export const GET_ALL_PROVINCE = gql`
  query provinces @api(name: "master") {
    provinces {
      code
      data {
        id
        code
        name
        orders
        status
        createDate
        createUser
      }
      message
      page
      pages
      records
    }
  }
`
export const GET_PROVINCE_DETAIL = gql`
  query province($provinceId: String!) @api(name: "master") {
    province(provinceId: $provinceId) {
      code
      data {
        id
        code
        name
        status
        createDate
        createUser
      }
      message
    }
  }
`

export const SAVE_PROVINCE = gql`
  mutation saveProvince($data: ProvinceInput!) @api(name: "master") {
    saveProvince(data: $data) {
      status
      code
      data {
        id
        code
        name
        status
        createDate
        createUser
      }
      message
    }
  }
`

export const REMOVE_PROVINCE = gql`
  mutation deleteProvince($id: String!) @api(name: "master") {
    deleteProvince(id: $id) {
      status
      code
      data {
        id
        status
      }
      message
    }
  }
`

export const useQueryProvince = (
  options?: QueryHookOptions<{ provinces?: IResponse<IProvince[]> }>
) => {
  return useQuery(GET_ALL_PROVINCE, options)
}

export const useLazyQueryProvince = (
  options?: QueryHookOptions<{ provinces?: IResponse<IProvince[]> }>
) => {
  return useLazyQuery(GET_ALL_PROVINCE, options)
}

export const useQueryProvinceDetail = (
  options?: QueryHookOptions<
    { provinces?: IResponse<IProvince> },
    { provinceId: string }
  >
) => {
  return useQuery(GET_PROVINCE_DETAIL, options)
}

export const useLazyQueryProvinceDetail = (
  options?: QueryHookOptions<
    { provinces?: IResponse<IProvince> },
    { provinceId: string }
  >
) => {
  return useLazyQuery(GET_PROVINCE_DETAIL, options)
}

export const useSaveProvince = (
  options?: MutationHookOptions<
    { saveProvince?: IResponse<IProvince> },
    { data: Partial<IProvince> }
  >
) => {
  return useMutation(SAVE_PROVINCE, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_PROVINCE,
      },
    ],
  })
}

export const useRemoveProvince = (
  options?: MutationHookOptions<
    { deleteProvince?: IResponse<IProvince> },
    { id: string }
  >
) => {
  return useMutation(REMOVE_PROVINCE, {
    ...options,
    refetchQueries: [
      {
        query: GET_ALL_PROVINCE,
      },
    ],
  })
}
