import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const ProjectList = ({ projects, removeProject, moveProjectDown, moveProjectUp }) => {
    const [highlightedIndex, setHighlightedIndex] = useState(null);

    const handlePositionChange = (project_name, position) => {
        toast.success(`${project_name} is moved ${position}`, {
            position: "top-center",
            hideProgressBar: true,
            theme: "colored"
        });
    }

    const handleMoveUp = (index) => {
        moveProjectUp(index);
        handlePositionChange(projects[index].title, 'up');
        highlightProject(index - 1);
    };

    const handleMoveDown = (index) => {
        moveProjectDown(index);
        handlePositionChange(projects[index].title, 'down');
        highlightProject(index + 1);
    };

    const highlightProject = (index) => {
        setHighlightedIndex(index);
        setTimeout(() => {
            setHighlightedIndex(null);
        }, 1000);
    };

    const highlightStyle = {
        transition: 'background-color 1s',
        backgroundColor: '#ffeb3b',
    }

    const normalStyle = {
        transition: 'background-color 1s',
    };

    return (
        <div className="flex flex-col gap-2">
            {projects.length > 0 &&
                <>
                    {projects.map((item, index) => (
                        <div key={index} className="mt-2 relative rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                        style={highlightedIndex === index ? highlightStyle : normalStyle}>
                            <div className="flex flex-row">
                                <button type="button" onClick={() => removeProject(index)} className="absolute right-[-0.3rem] top-[-0.5rem] bg-[#F44336] text-white text-[14.5px] py-1 px-2 rounded-lg shadow-md cursor-pointer hover:bg-red-600">Delete</button>
                                {projects.length > 1 &&
                                    <>
                                        {index != 0 &&
                                            <button
                                                onClick={() => handleMoveUp(index)}
                                                disabled={index === 0}
                                                className="absolute right-[10.5rem] top-[-0.5rem] bg-[#f0f0f3] text-black text-[14.5px] py-1 px-2 rounded-lg shadow-md cursor-pointer"
                                                type="button"
                                            >
                                                Move up
                                            </button>
                                        }
                                        {index != projects.length - 1 &&
                                            <button
                                                onClick={() => handleMoveDown(index)}
                                                disabled={index === projects.length - 1}
                                                className="absolute right-[4rem] top-[-0.5rem] bg-[#f0f0f3] text-black text-[14.5px] py-1 px-2 rounded-lg shadow-md cursor-pointer"
                                                type="button"
                                            >
                                                Move down
                                            </button>
                                        }
                                    </>
                                }
                            </div>
                            <div className="flex flex-col gap-2 text-sm leading-6">
                                <p className="pl-1">{item.title}</p>
                                <p className="pl-1">{item.description}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {item.images.map((image, imgIndex) => (
                                        <img key={imgIndex} src={URL.createObjectURL(image)} alt={`project-${index}-img-${imgIndex}`} className="w-24 h-24 rounded-lg object-cover" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            }
        </div>
    );
};

export default ProjectList;