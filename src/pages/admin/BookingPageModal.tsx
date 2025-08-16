import { PencilIcon } from "@heroicons/react/24/outline";
import { BookingDetails } from "@zenra/models";
import { Button, Modal } from "@zenra/widgets";

interface BookingPageModalProps {
    isOpen: boolean;
    setIsClose: Function;
    bookingDetails: BookingDetails | null;
}

export const BookingPageModal = ({ isOpen, setIsClose, bookingDetails }: BookingPageModalProps) => {

    return (
        <Modal
            open={isOpen}
            onClose={() => setIsClose(false)}
            title="Booking Details"
        >
            {bookingDetails && (
                <div className="space-y-6">
                    <img

                        src={`data:image/png;base64,${bookingDetails.packageImage}`}
                        alt={bookingDetails.packageTitle}
                        className="w-full h-64 object-cover rounded-lg"
                    />

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {bookingDetails.packageTitle}
                        </h2>
                        <p className="text-gray-600 mb-4">{bookingDetails.packageDescription}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="font-semibold text-gray-700">Price:</span>
                            <p className="text-2xl font-bold text-primary">${bookingDetails.totalPrice}</p>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Duration:</span>
                            <p className="text-gray-900">{bookingDetails.travelDate}</p>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Group Size:</span>
                            <p className="text-gray-900">{bookingDetails.groupSize}</p>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Availability:</span>
                            <p className="text-gray-900">{bookingDetails.startDate}</p>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-6">
                        <Button
                            variant="outline"
                            onClick={() => setIsClose(false)}
                        >
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                setIsClose(false);
                                // handleEdit(bookingDetails);
                            }}
                            startIcon={<PencilIcon className="h-5 w-5" />}
                        >
                            Edit Booking
                        </Button>
                    </div>
                </div>
            )}
        </Modal>
    );
};
