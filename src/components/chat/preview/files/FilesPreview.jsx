import { FileViewer } from "./FileViewer"
import { HandleAndSend } from "./HandleAndSend"
import { Header } from "./Header"
import { Input } from "./Input"

export const FilesPreview = () => {
  return (
    <div className="relative py-2 w-full flex items-center justify-center" >
        <div className="w-full flex flex-col items-center" >
            <Header />

            <FileViewer />
            <div className="w-full flex flex-col items-center" >
                <Input />

                <HandleAndSend />
            </div>
        </div>
    </div>
  )
}
