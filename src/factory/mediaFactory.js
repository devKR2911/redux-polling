/**
 * Function to make some modification to return object.
 * @param {*} mediaList
 */
export default function MediaFactory(mediaList) {
  return {
    data: mediaList,
    lastUpdatedOn: new Date()
  };
}
