import { List, Record } from 'immutable';

export const System = new Record({
  id: null,
  isNew: true,
  loading: false,
  items: new List(),
  error: null
});

export const createSystem = (data) => {
  return new System({
      ...data,
      id: data?.id,
      isNew:  data?.isNew,
      loading:  data?.loading,
      items: new List(data?.items ? data?.items : []),
      error:  data?.error,
  })
}