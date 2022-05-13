export function getterUtil(
  stateOrStore: any,
  fnName: string,
  nameSpace?: string
) {
  const storeGetters = stateOrStore.getters;

  if (storeGetters) {
    const localNameSpace = nameSpace ? `${nameSpace}/` : "";

    return storeGetters[`${localNameSpace}${fnName}`];
  }
}
