import { FC,useState } from 'react';
import Button from '@/src/components/button';
import { AiOutlineEye } from 'react-icons/ai';
import Modal from '@/src/components/modal';
import { TeamDetailsDocument } from '@/src/generated/generated';
import { useQuery } from '@apollo/client';


const VieweventModal: FC<{
    teamId:string,  
    modalTitle:string,
    modalResult:string
    }> = ( { teamId,modalTitle,modalResult } ) => {
    const [showModal, setShowModal] = useState(false);

    const {
        data:teamDeatils,
        loading:teamDeatilsLoading
    } = useQuery(TeamDetailsDocument,{
        variables:{
            id: teamId
        }
    });

    return (
        <>
        <Button onClick={() => setShowModal(true)} intent="secondary">
            <AiOutlineEye />{teamDeatils?.teamDetails.__typename==="QueryTeamDetailsSuccess" ?teamDeatils?.teamDetails.data.name : "" }
        </Button>
        <Modal
            showModal={showModal}
            onClose={() => setShowModal(false)}
            title={modalTitle+"-"+modalResult}
        >
            <div className='flex flex-col m-3 justify-center'>
                <div className='hidden md:flex flex-row justify-center p-2 bg-gray-600 rounded-lg mb-2'>
                    <span className="flex text-lg font-bold basis-1/4 text-center justify-center">PID</span>
                    <span className="flex text-lg font-bold basis-1/4 text-center justify-center">Name</span>
                    <span className="flex text-lg font-bold basis-1/4 text-center justify-center">Email</span>
                    <span className="flex text-lg font-bold basis-1/5 text-center justify-center">Phone</span>
                    <span className="flex text-lg font-bold basis-1/5 text-center justify-center">College</span>
                </div>
                <div className='md:h-64 md:max-h-72 h-96 overflow-y-auto'>
                    {teamDeatils?.teamDetails.__typename==="QueryTeamDetailsSuccess" ?
                        teamDeatils.teamDetails.data.members?.map((member:any) => (
                            <div
                                key={member.user.id}
                                className="flex md:flex-row flex-col border md:text-lg text-base border-gray-600 rounded-lg mb-2 p-2 md:justify-center justify-start"
                            >
                                <span className="md:text-base font-bold w-full md:w-1/5 mb-2 md:mb-0 justify-center text-center">
                                    {member.user.id}
                                </span>
                                <span className="md:text-base font-bold w-full md:w-1/5 mb-2 md:mb-0 justify-center text-center">
                                    {member.user.name}
                                </span>
                                <span className="md:text-base font-bold w-full md:w-1/5 mb-2 md:mb-0 justify-center text-center"
                                    style={{ wordBreak: "break-all" }}
                                >
                                    {member.user.email}
                                </span>
                                <span className="md:text-base font-bold w-full md:w-1/5 mb-2 md:mb-0 justify-center text-center">
                                    {member.user.phoneNumber}
                                </span>
                                <span className="md:text-base font-bold w-full md:w-1/5 mb-2 md:mb-0 justify-center text-center">
                                    {member.user.college.name}
                                </span>
                            </div>
                        ))
                        :
                        ""
        }
                </div>
            </div>
        </Modal>
        </>
    );
};

export default VieweventModal;
