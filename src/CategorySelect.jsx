import { useStates } from './utilities/states';

export default function CategorySelector() {

  const s = useStates('main');

  return <select {...s.bind('chosenCategoryName')}>
    <option key={0}>all</option>
    {s.categories.map(({ name, id }) =>
      <option key={id}>{name}</option>
    )}
  </select>

}