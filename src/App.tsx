import ImportButton from "./components/ImportButton";
import { useFileTreeStore } from "./domains/FileEntry/hooks/useFileTreeStore";

function App() {
  const root = useFileTreeStore((state) => state.root);

  return (
    <div>
      <ImportButton />
      {root &&
        root
          .getChildren()
          .map((child) => <span data-testid="top-child">{child.name}</span>)}
    </div>
  );
}

export default App;
